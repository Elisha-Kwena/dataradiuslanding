import type { Metadata } from "next";
import ProductPageLayout from "@/components/pages/products/ProductPageLayout";
import { fibre as data } from "@/lib/productPages";

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
};

export default function Page() {
  return <ProductPageLayout data={data} />;
}
