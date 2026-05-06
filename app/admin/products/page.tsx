'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Plus, Pencil, Trash2, Search, X, Sparkles, LayoutDashboard, ShoppingBag, LogOut, ChevronLeft, ChevronRight, Check, AlertTriangle } from 'lucide-react';

interface Product {
  _id: string; name: string; price: number; originalPrice?: number; discount?: number;
  category: string; description?: string; image: string; inStock: boolean; rating: number; reviews: number; featured: boolean;
}

const CATEGORIES = ['Makeup', 'Skin', 'Hair', 'Fragrance', 'Bath & Body', 'Wellness'];
const EMPTY_FORM = { name: '', price: '', originalPrice: '', category: 'Makeup', description: '', image: '', inStock: true, featured: false };

const SidebarLink = ({ label, icon: Icon, href, active }: { label: string; icon: React.ElementType; href: string; active?: boolean }) => (
  <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm"
    style={{ background: active ? '#FDF2F4' : 'transparent', color: active ? '#D4697E' : '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontWeight: active ? 600 : 400, border: active ? '1px solid #F2B3BF' : '1px solid transparent' }}>
    <Icon size={17} /> {label}
  </Link>
);

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: String(LIMIT), page: String(page), ...(filterCategory !== 'All' && { category: filterCategory }), ...(search && { search }) });
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.pages ?? 1);
    } catch { console.error('Failed to fetch'); }
    finally { setLoading(false); }
  }, [page, filterCategory, search]);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (!d.user || d.user.role !== 'admin') router.push('/admin/login'); });
  }, [router]);

  useEffect(() => { const t = setTimeout(fetchProducts, 300); return () => clearTimeout(t); }, [fetchProducts]);

  const openCreate = () => { setEditProduct(null); setForm(EMPTY_FORM); setFormError(''); setShowModal(true); };
  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, price: String(p.price), originalPrice: String(p.originalPrice ?? ''), category: p.category, description: p.description ?? '', image: p.image, inStock: p.inStock, featured: p.featured });
    setFormError(''); setShowModal(true);
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFormError('');

    try {
      // 1. Get auth parameters
      const authRes = await fetch('/api/imagekit/auth');
      const authData = await authRes.json();

      // 2. Upload to ImageKit
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '');
      formData.append('signature', authData.signature);
      formData.append('expire', authData.expire);
      formData.append('token', authData.token);

      const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadRes.ok) {
        setForm({ ...form, image: uploadData.url });
      } else {
        setFormError(uploadData.message || 'Upload failed');
      }
    } catch (err) {
      setFormError('Image upload failed. Check keys.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image || !form.category) { setFormError('Name, price, image, and category are required'); return; }
    setSaving(true); setFormError('');
    try {
      const payload = { name: form.name, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined, category: form.category, description: form.description, image: form.image, inStock: form.inStock, featured: form.featured };
      const url = editProduct ? `/api/products/${editProduct._id}` : '/api/products';
      const res = await fetch(url, { method: editProduct ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setFormError(d.error ?? 'Save failed'); return; }
      setShowModal(false); fetchProducts();
    } catch { setFormError('Network error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return; setDeleting(true);
    try { const res = await fetch(`/api/products/${deleteId}`, { method: 'DELETE' }); if (res.ok) { setDeleteId(null); fetchProducts(); } }
    catch { console.error('Delete failed'); } finally { setDeleting(false); }
  };

  const handleLogout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/admin/login'); };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div onClick={onChange} className="w-10 h-6 rounded-full relative transition-all cursor-pointer flex-shrink-0" style={{ background: checked ? '#D4697E' : '#E5D5D9' }}>
      <div className="absolute w-4 h-4 rounded-full bg-white top-1 transition-all shadow-sm" style={{ left: checked ? '22px' : '4px' }} />
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col admin-sidebar hide-mobile">
        <div className="px-5 py-5" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Sparkles size={16} className="text-white" /></div>
            <div>
              <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A1219' }}>COSMATIC</p>
              <p style={{ color: '#A89AA1', fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif' }}>Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <SidebarLink label="Dashboard" icon={LayoutDashboard} href="/admin/dashboard" />
          <SidebarLink label="Products" icon={Package} href="/admin/products" active />
          <SidebarLink label="Orders" icon={ShoppingBag} href="/admin/orders" />
        </nav>
        <div className="p-3" style={{ borderTop: '1px solid #F0E8EA' }}>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left" style={{ color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-8 py-5 bg-white" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <div>
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#1A1219' }}>Products</h1>
            <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>Manage your product catalog</p>
          </div>
          <button onClick={openCreate} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.825rem', gap: '0.4rem' }}>
            <Plus size={15} /> Add Product
          </button>
        </div>

        <div className="p-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#A89AA1' }} />
              <input type="text" placeholder="Search products..." className="form-input" style={{ paddingLeft: '2.5rem' }} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            </div>
            <select className="form-input" style={{ width: 'auto', minWidth: '160px' }} value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setPage(1); }}>
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F0E8EA' }}>
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto mb-3" style={{ borderColor: '#D4697E', borderTopColor: 'transparent' }} />
                <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="p-16 text-center">
                <Package size={40} style={{ color: '#E5D5D9', margin: '0 auto 1rem' }} />
                <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', marginBottom: '1rem' }}>No products found</p>
                <button onClick={openCreate} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Add First Product</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Featured</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" style={{ border: '1px solid #F0E8EA' }} />
                            <div>
                              <p style={{ color: '#1A1219', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }}>{product.name}</p>
                              {product.discount && <p style={{ color: '#16A34A', fontSize: '0.75rem' }}>{product.discount}% off</p>}
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-primary">{product.category}</span></td>
                        <td>
                          <p style={{ color: '#1A1219', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>₹{product.price.toLocaleString()}</p>
                          {product.originalPrice && <p style={{ color: '#A89AA1', fontSize: '0.75rem', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</p>}
                        </td>
                        <td><span className={`badge ${product.inStock ? 'badge-success' : 'badge-error'}`}>{product.inStock ? 'In Stock' : 'Out of Stock'}</span></td>
                        <td><span style={{ color: '#C9975A', fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }}>★ {product.rating} <span style={{ color: '#A89AA1', fontSize: '0.75rem' }}>({product.reviews})</span></span></td>
                        <td>{product.featured && <span className="badge badge-gold">Featured</span>}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(product)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#2563EB' }}><Pencil size={14} /></button>
                            <button onClick={() => setDeleteId(product._id)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-5">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost" style={{ padding: '0.5rem 0.75rem', opacity: page === 1 ? 0.4 : 1 }}><ChevronLeft size={16} /></button>
              <span style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }}>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-ghost" style={{ padding: '0.5rem 0.75rem', opacity: page === totalPages ? 0.4 : 1 }}><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </main>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden animate-scaleIn" style={{ border: '1px solid #F0E8EA', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F0E8EA', background: '#FAFAFA' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FDF2F4' }}><Package size={16} style={{ color: '#D4697E' }} /></div>
                <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219' }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F5F5F5', color: '#6B5E65' }}><X size={16} /></button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4 flex-1">
              {formError && <div className="p-3 rounded-xl flex items-center gap-2 text-sm" style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}><AlertTriangle size={14} /> {formError}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="form-label">Product Name *</label>
                  <input className="form-input" placeholder="e.g. Luxury Lip Tint" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Price (₹) *</label>
                  <input type="number" className="form-input" placeholder="599" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} min="0" />
                </div>
                <div>
                  <label className="form-label">Original Price (₹)</label>
                  <input type="number" className="form-input" placeholder="899 (for discount)" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} min="0" />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Product Image *</label>
                  <div className="flex gap-2">
                    <input className="form-input flex-1" placeholder="Image URL or Upload →" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                    <label className="btn-ghost flex items-center gap-2 cursor-pointer" style={{ padding: '0 1rem', fontSize: '0.8rem', border: '1px solid #F0E8EA' }}>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      {uploading ? <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" /> : <Plus size={16} />}
                      Upload
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" rows={3} placeholder="Product description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Toggle checked={form.inStock} onChange={() => setForm({ ...form, inStock: !form.inStock })} />
                    <span style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>In Stock</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Toggle checked={form.featured} onChange={() => setForm({ ...form, featured: !form.featured })} />
                    <span style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Featured</span>
                  </label>
                </div>
                {form.image && (
                  <div className="md:col-span-2">
                    <label className="form-label">Preview</label>
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => setForm({ ...form, image: '' })} className="absolute top-1 right-1 bg-white/80 rounded-lg p-1 text-red-500 shadow-sm"><X size={12} /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid #F0E8EA', background: '#FAFAFA' }}>
              <button onClick={() => setShowModal(false)} className="btn-ghost" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', opacity: (saving || uploading) ? 0.7 : 1, gap: '0.4rem' }}>
                {saving ? <>Saving...</> : <><Check size={15} /> {editProduct ? 'Update' : 'Create'} Product</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm bg-white rounded-2xl p-8 text-center animate-scaleIn" style={{ border: '1px solid #F0E8EA', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <AlertTriangle size={26} style={{ color: '#DC2626' }} />
            </div>
            <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1A1219', marginBottom: '0.5rem' }}>Delete Product?</h3>
            <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', marginBottom: '2rem', fontSize: '0.875rem' }}>This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-ghost flex-1" style={{ fontSize: '0.875rem' }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all text-white" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', opacity: deleting ? 0.7 : 1, fontFamily: 'Josefin Sans, sans-serif' }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
