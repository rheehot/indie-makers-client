import React from "react";
import Head from "next/head";
import { getProduct } from "../../types/api";
import ProductEditor from "../../components/productEditor";

interface IProps {
  data: getProduct;
  updateProduct: (
    name: string,
    description: string,
    logoUrl?: string,
    website?: string,
    needsHelp?: boolean,
    isLaunched?: boolean
  ) => void;
}

const EditProductPresenter: React.SFC<IProps> = ({
  data: {
    GetProduct: { product }
  },
  updateProduct
}) =>
  product && (
    <>
      <Head>
        <title>Editing {product.name} | Nomad Coders</title>
        <meta name="description" content={`Editing ${product.name}`} />
      </Head>
      <ProductEditor
        logoUrl={product.logo || undefined}
        name={product.name}
        description={product.description}
        website={product.website || undefined}
        needsHelp={product.needsHelp}
        onSaveFn={updateProduct}
        title={`Edit ${product.name}`}
        isLaunched={product.isLaunched}
        buttonText={"Update Product"}
      />
    </>
  );
export default EditProductPresenter;
