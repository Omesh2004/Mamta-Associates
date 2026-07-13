"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  FileJson,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  Save,
  Trash2,
  Pencil
} from "lucide-react";
import {
  applications,
  categories,
  certifications,
  packageTypes,
  type Product,
  type ProductApplication,
  type ProductCategory,
  type ProductCertification,
  type ProductPackageType
} from "@/lib/products";
import type { SiteContent } from "@/lib/content";

type ProductForm = Omit<Product, "application" | "certifications" | "badges" | "compatibility"> & {
  application: string;
  certifications: string;
  badges: string;
  compatibility: string;
  imageUrl: string;
};

const defaultProductForm: ProductForm = {
  id: "",
  title: "",
  category: "Hospital",
  application: "Manual, Surface",
  certifications: "GreenPro",
  active: "",
  price: 0,
  caseQty: "Case of 4x5L",
  badges: "",
  imageTone: "from-emerald-50 via-white to-teal-100",
  packageType: "trigger",
  popularity: 80,
  ecoScore: 100,
  molecule: "",
  compatibility: "",
  dilution: "",
  impact: "",
  imageUrl: ""
};

function listFromText(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function productFromForm(form: ProductForm): Product {
  return {
    ...form,
    id: form.id || slugify(form.title),
    category: form.category as ProductCategory,
    application: listFromText(form.application) as ProductApplication[],
    certifications: listFromText(form.certifications) as ProductCertification[],
    badges: listFromText(form.badges),
    compatibility: listFromText(form.compatibility),
    packageType: form.packageType as ProductPackageType,
    price: Number(form.price),
    popularity: Number(form.popularity),
    ecoScore: Number(form.ecoScore),
    imageUrl: form.imageUrl || null
  };
}

function formFromProduct(product: Product): ProductForm {
  return {
    ...product,
    application: product.application.join(", "),
    certifications: product.certifications.join(", "),
    badges: product.badges.join(", "),
    compatibility: product.compatibility.join(", "),
    imageUrl: product.imageUrl || ""
  };
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [jsonDraft, setJsonDraft] = useState("");
  const [productForm, setProductForm] = useState<ProductForm>(defaultProductForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/admin/content", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load admin content.");
        return response.json();
      })
      .then((nextContent: SiteContent) => {
        setContent(nextContent);
        setJsonDraft(JSON.stringify(nextContent.siteText, null, 2));
      })
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Unable to load content."));
  }, [status]);

  const totalProducts = content?.products.length ?? 0;
  const categoriesUsed = useMemo(() => {
    if (!content) return 0;
    return new Set(content.products.map((product) => product.category)).size;
  }, [content]);

  async function saveContent(nextContent: SiteContent) {
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextContent)
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to save content.");

      setContent(payload.content);
      setJsonDraft(JSON.stringify(payload.content.siteText, null, 2));
      setMessage("Saved. The website will fetch the updated JSON on refresh.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save content.");
    } finally {
      setIsSaving(false);
    }
  }

  async function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content) return;

    const nextProduct = productFromForm(productForm);
    if (!nextProduct.id || !nextProduct.title || !nextProduct.active) {
      setError("Product needs at least title, active chemistry, and a generated or custom id.");
      return;
    }

    if (selectedFile) {
      setIsSaving(true);
      setError("");
      setMessage("");
      
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData
        });
        
        if (!uploadRes.ok) {
          const uploadData = await uploadRes.json();
          setError(uploadData.error || "Failed to upload image.");
          setIsSaving(false);
          return;
        }
        
        const uploadData = await uploadRes.json();
        nextProduct.imageUrl = uploadData.filename;
      } catch (uploadError) {
        setError("Failed to upload image.");
        setIsSaving(false);
        return;
      }
    }

    const nextContent = {
      ...content,
      products: [...content.products.filter((product) => product.id !== nextProduct.id), nextProduct]
    };

    setProductForm(defaultProductForm);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    
    await saveContent(nextContent);
  }

  function deleteProduct(id: string) {
    if (!content) return;
    saveContent({
      ...content,
      products: content.products.filter((product) => product.id !== id)
    });
  }

  function saveSiteText() {
    if (!content) return;

    try {
      const nextSiteText = JSON.parse(jsonDraft);
      saveContent({ ...content, siteText: nextSiteText });
    } catch {
      setError("Site text JSON is invalid. Fix the JSON syntax before saving.");
    }
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slatewash">
        <Loader2 className="h-10 w-10 animate-spin text-forest" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slatewash">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <LayoutDashboard className="mr-2 h-6 w-6 text-forest" />
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-sm text-slate-500 sm:block">
              Logged in as <span className="font-semibold text-slate-900">{session.user?.email}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Content Control Center</h2>
          <p className="mt-1 text-slate-500">
            Products and website copy are saved in <span className="font-semibold text-slate-700">data/site-content.json</span>.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-3">
          <StatCard icon={<FileText className="h-6 w-6 text-emerald-600" />} label="Total Products" value={String(totalProducts)} />
          <StatCard icon={<FileJson className="h-6 w-6 text-blue-600" />} label="Catalog Categories" value={String(categoriesUsed)} />
          <StatCard icon={<Save className="h-6 w-6 text-indigo-600" />} label="Storage" value="JSON" />
        </div>

        {(message || error) && (
          <div
            className={`mb-6 rounded-md border px-4 py-3 text-sm font-medium ${
              error ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || message}
          </div>
        )}

        {!content ? (
          <div className="flex min-h-80 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-forest" />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Add Catalog Product</h3>
                <p className="mt-1 text-sm text-slate-500">Submitting a product with an existing id updates that item.</p>
              </div>

              <form onSubmit={addProduct} className="grid gap-4 p-6 sm:grid-cols-2">
                <TextField label="Product Title" value={productForm.title} onChange={(title) => setProductForm((form) => ({ ...form, title, id: form.id || slugify(title) }))} required />
                <TextField label="Product ID" value={productForm.id} onChange={(id) => setProductForm((form) => ({ ...form, id }))} required />
                
                <div className="block sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-700">Product Image (Optional)</span>
                  <span className="ml-2 text-xs text-slate-400">Upload a new image to replace the current one.</span>
                  {productForm.imageUrl && (
                    <div className="mt-2 mb-2 text-xs font-medium text-emerald-700">
                      Current Image: <a href={productForm.imageUrl} target="_blank" rel="noreferrer" className="underline">{productForm.imageUrl}</a>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                </div>

                <SelectField label="Category" value={productForm.category} values={categories} onChange={(category) => setProductForm((form) => ({ ...form, category: category as ProductCategory }))} />
                <SelectField label="Package Type" value={productForm.packageType} values={packageTypes} onChange={(packageType) => setProductForm((form) => ({ ...form, packageType: packageType as ProductPackageType }))} />
                <TextField label="Applications" hint={applications.join(", ")} value={productForm.application} onChange={(application) => setProductForm((form) => ({ ...form, application }))} />
                <TextField label="Certifications" hint={certifications.join(", ")} value={productForm.certifications} onChange={(certificationsValue) => setProductForm((form) => ({ ...form, certifications: certificationsValue }))} />
                <TextField label="Active Chemistry" value={productForm.active} onChange={(active) => setProductForm((form) => ({ ...form, active }))} required />
                <TextField label="Case Quantity" value={productForm.caseQty} onChange={(caseQty) => setProductForm((form) => ({ ...form, caseQty }))} />
                <NumberField label="Price" value={productForm.price} onChange={(price) => setProductForm((form) => ({ ...form, price }))} />
                <NumberField label="Popularity" value={productForm.popularity} onChange={(popularity) => setProductForm((form) => ({ ...form, popularity }))} />
                <NumberField label="Eco Score" value={productForm.ecoScore} onChange={(ecoScore) => setProductForm((form) => ({ ...form, ecoScore }))} />
                <TextField label="Badges" value={productForm.badges} onChange={(badges) => setProductForm((form) => ({ ...form, badges }))} />
                <TextField label="Image Tone" value={productForm.imageTone} onChange={(imageTone) => setProductForm((form) => ({ ...form, imageTone }))} className="sm:col-span-2" />
                <TextArea label="Molecule Breakdown" value={productForm.molecule} onChange={(molecule) => setProductForm((form) => ({ ...form, molecule }))} />
                <TextArea label="Compatibility" hint="Comma separated surfaces or locations" value={productForm.compatibility} onChange={(compatibility) => setProductForm((form) => ({ ...form, compatibility }))} />
                <TextArea label="Dilution" value={productForm.dilution} onChange={(dilution) => setProductForm((form) => ({ ...form, dilution }))} />
                <TextArea label="Impact" value={productForm.impact} onChange={(impact) => setProductForm((form) => ({ ...form, impact }))} />

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-canopy disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    Add or Update Product
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Website Text JSON</h3>
                  <p className="mt-1 text-sm text-slate-500">Edit headings, CTA labels, contact copy, and other central text.</p>
                </div>
                <button
                  onClick={saveSiteText}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Text
                </button>
              </div>
              <div className="p-6">
                <textarea
                  value={jsonDraft}
                  onChange={(event) => setJsonDraft(event.target.value)}
                  spellCheck={false}
                  className="min-h-[590px] w-full rounded-md border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-50 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
              <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Current Catalog Items</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {content.products.map((product) => (
                  <div key={product.id} className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{product.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {product.category} · {product.active} · ₹{product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setProductForm(formFromProduct(product));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={isSaving}
                        className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        disabled={isSaving}
                        className="inline-flex w-fit items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-lg bg-slate-50 p-3">{icon}</div>
      <div className="ml-5">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  hint,
  className = ""
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {hint && <span className="ml-2 text-xs text-slate-400">{hint}</span>}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

function SelectField<T extends readonly string[]>({
  label,
  value,
  values,
  onChange
}: {
  label: string;
  value: string;
  values: T;
  onChange: (value: T[number]) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T[number])}
        className="mt-1 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  hint
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {hint && <span className="ml-2 text-xs text-slate-400">{hint}</span>}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-28 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}
