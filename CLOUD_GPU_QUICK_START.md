# Quick Integration Guide - Cloud GPU Cost Comparison Tool

## 🚀 5-Minute Setup

### Frontend (React)

**1. Import the component**
```tsx
import CloudGPUComparison from '@/components/CloudGPUComparison';
import CloudGPUFAQ from '@/components/CloudGPUFAQ';
```

**2. Add routes in your router**
```tsx
// In your main routing file (e.g., App.tsx or router.tsx)
<Route path="/tools/cloud-gpu-cost-comparison" element={<CloudGPUComparison />} />
<Route path="/tools/cloud-gpu-cost-comparison/faq" element={<CloudGPUFAQ />} />
```

**3. Dependencies**
```bash
npm install lucide-react  # Only external dependency
```

**4. That's it!** The component handles all state management and styling internally.

---

### Backend (Laravel)

**1. Copy the controller**
```bash
cp GPUPricingController.php app/Http/Controllers/
```

**2. Routes are already added to `routes/api.php`**
(Check that these lines exist):
```php
use App\Http\Controllers\GPUPricingController;

Route::prefix('gpu')->group(function () {
    Route::get('/pricing', [GPUPricingController::class, 'getPricing']);
    Route::post('/calculate-cost', [GPUPricingController::class, 'calculateCost']);
    Route::post('/recommendations', [GPUPricingController::class, 'getRecommendations']);
});
```

**3. Test the API**
```bash
# Test endpoint
curl http://localhost:8000/api/gpu/pricing

# Should return JSON with B200, H200, H100, L40S, A100 pricing
```

---

### Content Integration

**1. Guide**
- File: `CLOUD_GPU_GUIDE.md`
- Where to host: Store as markdown or convert to blog post
- Link from: Calculator tool footer, "Learn More" button

**2. FAQ**
- Component: `CloudGPUFAQ.tsx` (already integrated in `/faq` route)
- Or use markdown version and link from calculator

**3. SEO Metadata**
- File: `CLOUD_GPU_SEO_STRATEGY.md`
- Use meta tags from the HTML example
- Add to page `<head>` or Next.js `metadata` export

---

## 🔌 API Examples

### Get All Pricing

**Request**:
```bash
GET /api/gpu/pricing
```

**Response**:
```json
{
  "status": "success",
  "timestamp": "2026-04-23T10:30:00Z",
  "data": {
    "B200": {
      "name": "NVIDIA B200 (Blackwell)",
      "vram": "192GB HBM3E",
      "providers": {
        "Hyperscaler": { "rate": 14.24, "provider": "AWS/GCP/Azure" },
        "Specialist": { "rate": 4.99, "provider": "RunPod/Modal" },
        "Spot": { "rate": 2.12, "provider": "Vast.ai" }
      }
    },
    ...
  }
}
```

---

### Calculate Cost

**Request**:
```bash
POST /api/gpu/calculate-cost
Content-Type: application/json

{
  "gpu_model": "H200",
  "provider_type": "Specialist",
  "hours": 168,
  "quantity": 1
}
```

**Response**:
```json
{
  "status": "success",
  "gpu": {
    "model": "NVIDIA H200 (Hopper)",
    "vram": "141GB HBM3"
  },
  "pricing": {
    "hourly_rate": 3.59,
    "total_cost": "602.12",
    "monthly_cost": "602.12", 
    "annual_cost": "7225.44"
  },
  "savings": {
    "vs_hyperscaler_monthly": "1210.56",
    "vs_hyperscaler_annual": "14526.72",
    "savings_percentage": "66.7"
  }
}
```

---

### Get Recommendations

**Request**:
```bash
POST /api/gpu/recommendations
Content-Type: application/json

{
  "workload_type": "Inference",
  "monthly_budget": 5000,
  "model_size": "30B"
}
```

**Response**:
```json
{
  "status": "success",
  "recommendation": {
    "recommended_gpu": "H200",
    "recommended_provider": "Specialist",
    "reasoning": "Best cost-to-throughput for 30B inference",
    "throughput": "3800 tokens/sec",
    "estimated_monthly_cost": 2620
  },
  "budget_status": "within_budget",
  "budget_gap": 2380
}
```

---

## 📱 Component Props

### CloudGPUComparison
**No props required** (fully self-contained)

```tsx
<CloudGPUComparison />
```

Uses internal state for:
- Selected GPU model
- Selected provider
- Usage hours
- Quantity
- Workload type

---

### CloudGPUFAQ
**No props required** (fully self-contained)

```tsx
<CloudGPUFAQ />
```

Features:
- Expandable FAQ items
- Category filtering
- Schema.org markup
- CTA to calculator

---

## 🎨 Styling

**Components use Tailwind CSS**. Ensure Tailwind is installed:

```bash
npm install -D tailwindcss
```

**Color palette used**:
- Primary: Blue (`bg-blue-50`, `text-blue-600`)
- Alerts: Red (`bg-red-50`, `text-red-600`)
- Success: Green (`bg-green-100`)
- Warning: Yellow (`bg-yellow-100`)
- Neutrals: Gray (`bg-gray-50` to `bg-gray-900`)

No custom CSS needed—all styles are inline Tailwind classes.

---

## ✅ Verification Checklist

- [ ] Frontend routes load without errors
- [ ] Calculator component renders
- [ ] FAQ component renders
- [ ] API endpoint `/api/gpu/pricing` returns JSON
- [ ] POST `/api/gpu/calculate-cost` returns calculation
- [ ] POST `/api/gpu/recommendations` returns recommendation
- [ ] Mobile responsive (test on phone)
- [ ] No console errors

---

## 🐛 Troubleshooting

### "Cannot find module 'lucide-react'"
```bash
npm install lucide-react
```

### API returns 404
Check that routes are added to `routes/api.php` and prefix is `/api/gpu`

### Styles look broken
Ensure Tailwind CSS is properly installed and configured in your build

### Component not rendering
Check that imports are correct and component paths match your directory structure

---

## 📞 Support

For questions about:
- **Component usage**: Check the component comments in the TSX files
- **API responses**: See examples above
- **SEO metadata**: Refer to `CLOUD_GPU_SEO_STRATEGY.md`
- **Content**: See `CLOUD_GPU_GUIDE.md` and `CLOUD_GPU_FAQ.tsx`

---

**Ready to go!** 🚀 Deploy with confidence.

