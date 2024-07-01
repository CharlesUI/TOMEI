import React, { FormEvent, useState } from "react";
//Context
import { Product } from "../Types/ProductContextTypes";
//Hooks
import { useAddProductItem } from "../hooks/useAddProductItem";

type AddItemPropsTypes = {
  toggleAdd: boolean,
  setToggleAdd: React.Dispatch<React.SetStateAction<boolean>>
  token: string | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateToggle: boolean;
  setUpdateToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItemBox = ({ setToggleAdd, token, setProducts, updateToggle, setUpdateToggle }: AddItemPropsTypes) => {
  const [newItem, setNewItem] = useState<Product>({
    ITEM: "",
    ITEM_TYPE: "",
    DOSAGE: "",
    MFG_DATE: "",
    EXP_DATE: "",
    STOCK_COUNT: "",
  });

  const { addProduct } = useAddProductItem()

  const handleAddItemSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await addProduct(newItem, token, setProducts)
    setUpdateToggle(!updateToggle)
    setToggleAdd(false)
  }

  return (
    <>
      {newItem && (
        <form
          onSubmit={handleAddItemSubmit}
          className="border-2 border-black absolute inset-x-0 mt-4 bg-slate-50 rounded-lg w-[90%] sm:w-[400px] z-50 m-auto flex flex-col justify-around items-center p-2 gap-1 text-[10px] md:text-xs"
        >
          <label htmlFor="ITEM" className=" mr-auto text-black font-bold">
            ITEM
          </label>
          <input
            id="ITEM"
            className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
            type="text"
            placeholder="ITEM"
            name="ITEM"
            value={newItem.ITEM}
            onChange={(e) => setNewItem({ ...newItem, ITEM: e.target.value })}
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
            value={newItem.ITEM_TYPE}
            onChange={(e) => setNewItem({ ...newItem, ITEM_TYPE: e.target.value })}
          />
          <label htmlFor="DOSAGE" className=" mr-auto text-black font-bold">
            DOSAGE
          </label>
          <input
            id="DOSAGE"
            className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
            type="string"
            placeholder="DOSAGE"
            name="DOSAGE"
            value={newItem.DOSAGE}
            onChange={(e) => setNewItem({ ...newItem, DOSAGE: e.target.value })}
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
                value={newItem.MFG_DATE}
                onChange={(e) => setNewItem({ ...newItem, MFG_DATE: e.target.value })}
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
                value={newItem.EXP_DATE}
                onChange={(e) => setNewItem({ ...newItem, EXP_DATE: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full py-1 flex gap-3">
            <div className="flex-col">
              <label htmlFor="STOCK_COUNT" className=" mr-auto text-black font-bold">
                STOCK COUNT
              </label>
              <input
                id="STOCK_COUNT"
                className="w-full p-2 border-2 border-gray-700 rounded-md text-black"
                type="string"
                placeholder="STOCK_COUNT"
                name="STOCK_COUNT"
                value={newItem.STOCK_COUNT}
                onChange={(e) => setNewItem({ ...newItem, STOCK_COUNT: e.target.value })}
              />
            </div>
          </div>
          <div className="flex w-full justify-between py-1 gap-2">
            <button
              type="submit"
              className="grow border-2 border-black rounded-md justify-center items-center font-bold hover:bg-gray-100 flex text-black p-2"
            // disabled={}
            >
              ADD
            </button>
            <button
              className="grow border-2 border-black rounded-md justify-center items-center font-bold hover:bg-gray-100 flex text-black p-2"
              // disabled={}
              onClick={() => setToggleAdd(false)}
            >
              CANCEL
            </button>
          </div>
          {/* {error ? <div className=" text-red-600">{error}</div> : null} */}
        </form>
      )}
    </>
  );
};

export default AddItemBox;
