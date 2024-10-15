import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Product {
  id: string;
  //category: string | null; //Category
  name: string;
  priceInCents: number;
  //discountCodes: string[];
  description: string;
  isAvailableForPurchase: boolean;
  quantity: number;
  //size: Size;
  //color: Color;
  imagePath: string;
  createdAt: Date;
  //storeId: string
};