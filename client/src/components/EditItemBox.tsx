import React, { ChangeEvent, FormEvent, useState } from "react";
//Context
import { Product } from "../Types/ProductContextTypes";
//Hooks
import { useUpdateProduct } from "../hooks/useUpdateProduct";

type EditItemPropsTypes = {
  toggleEdit: boolean;
  setToggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  _id: string;
  token: string | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setUpdateToggle: React.Dispatch<React.SetStateAction<boolean>>;
  updateToggle: boolean;
};

const EditItemBox = ({
  setToggleEdit,
  products,
  _id,
  token,
  setProducts,
  setUpdateToggle,
  updateToggle,
}: EditItemPropsTypes) => {
  const [productToEdit, setProductToEdit] = useState<Product>();
  const { updateProduct } = useUpdateProduct();

  const updateProductToEdit = (products: Product[], id: string) => {
    return products.map((product: Product) => {
      if (product._id === id) {
        const parsedExpiryDate = product.EXP_DATE
          ? new Date(product.EXP_DATE)
          : null;
        const formattedExpiryDate = parsedExpiryDate
          ? parsedExpiryDate.toISOString().slice(0, 10) // Extract YYYY-MM-DD
          : "";
        const parsedIssuanceDate = product.MFG_DATE
          ? new Date(product.MFG_DATE)
          : null;
        const formattedIssuanceDate = parsedIssuanceDate
          ? parsedIssuanceDate.toISOString().slice(0, 10) // Extract YYYY-MM-DD
          : "";
          setProductToEdit({
          _id: product._id,
          ITEM: product.ITEM,
          ITEM_TYPE: product.ITEM_TYPE,
          DOSAGE: product.DOSAGE,
          MFG_DATE: formattedIssuanceDate,
          EXP_DATE: formattedExpiryDate,
          STOCK_COUNT: product.STOCK_COUNT,
        });
      }
    });
  };

  useState(() => {
    //CHECK FIRST IF THE TOKEN IS PRESENT | IF PRESENT PASS THE TOKEN AS THE PARAMETER FOR THE FUNCTION
    if (products) {
      updateProductToEdit(products, _id);
    } else {
      setToggleEdit(false);
    }
  });

  const toggleOnChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit((prevProduct) => {
      if (prevProduct) {
        return { ...prevProduct, [name]: value };
      }
    });
  };

  return (
    <>
      {productToEdit && (
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            updateProduct(_id, token, setProducts, productToEdit);
            setUpdateToggle(!updateToggle);
            setToggleEdit(false);
          }}
          className="border-2 border-black absolute inset-x-0 mt-4 bg-slate-50 rounded-lg w-[90%] sm:w-[400px] z-50 m-auto flex flex-col justify-around items-center p-2 gap-1 text-[10px] md:text-xs"
        >
          <label htmlFor="NAME" className=" mr-auto text-black font-bold">
            ITEM
          </label>
          <input
            id="ITEM"
            className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
            type="text"
            placeholder="ITEM"
            name="ITEM"
            value={productToEdit.ITEM}
            onChange={(e) => toggleOnChange(e)}
          />
          <label htmlFor="ITEM_TYPE" className=" mr-auto text-black font-bold">
            ITEM TYPE
          </label>
          <input
            id="ITEM_TYPE"
            className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
            type="text"
            placeholder="ITEM_TYPE"
            name="ITEM_TYPE"
            value={productToEdit.ITEM_TYPE}
            onChange={(e) => toggleOnChange(e)}
          />
          <label htmlFor="DOSAGE" className=" mr-auto text-black font-bold">
            DOSAGE
          </label>
          <input
            id="DOSAGE"
            className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
            type="text"
            placeholder="DOSAGE"
            name="DOSAGE"
            value={productToEdit.DOSAGE}
            onChange={(e) => toggleOnChange(e)}
          />
          <div className="w-full py-2 flex justify-between">
            <div className="flex-col">
              <label htmlFor="MFG_DATE" className=" mr-auto text-black font-bold">
                MFG DATE
              </label>
              <input
                id="MFG_DATE"
                className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
                type="date"
                placeholder="MFG_DATE"
                name="MFG_DATE"
                value={productToEdit.MFG_DATE}
                onChange={(e) => toggleOnChange(e)}
              />
            </div>
            <div className="flex-col">
              <label htmlFor="EXP_DATE" className=" mr-auto text-black font-bold">
                EXP DATE
              </label>
              <input
                id="EXP_DATE"
                className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
                type="date"
                placeholder="EXP_DATE"
                name="EXP_DATE"
                value={productToEdit.EXP_DATE}
                onChange={(e) => toggleOnChange(e)}
              />
            </div>
          </div>
          <div className="w-full py-1 flex gap-5">
            <div className="flex-col">
              <label htmlFor="COUNT" className=" mr-auto text-black font-bold">
                COUNT
              </label>
              <input
                id="COUNT"
                className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
                type="string"
                placeholder="Count"
                name="STOCK_COUNT"
                value={productToEdit.STOCK_COUNT}
                onChange={(e) => toggleOnChange(e)}
              />
            </div>
          </div>

          <div className="flex w-full py-2 gap-2">
            <button
              type="submit"
              className="grow border-2 border-black rounded-md justify-center items-center font-bold hover:bg-gray-100 flex text-black p-2"
            // disabled={}
            >
              UPDATE
            </button>
            <button
              className="grow border-2 border-black rounded-md justify-center items-center font-bold hover:bg-gray-100 flex text-black p-2"
              // disabled={}
              onClick={() => setToggleEdit(false)}
            >
              CANCEL
            </button>
          </div>
          {/* {error ? <div className=" text-red-600">{error}</div> : null} */}
        </form >
      )}
    </>
  );
};

export default EditItemBox;
