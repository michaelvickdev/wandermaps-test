import { NextPageContext } from "next";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  isAvailable: boolean;
  price: number;
  rating: number;
}


export interface NextContex extends NextPageContext {
  params: { [key: string]: string };
}
