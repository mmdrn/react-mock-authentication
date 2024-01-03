import { FC, memo, useCallback, useEffect, useState } from "react";
import Modal from "../../../../components/modal";
import TextInput from "../../../../components/text-input";
import Button from "../../../../components/button";
import TextareaInput from "../../../../components/textarea-input";

interface IProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    description: string,
    price: number,
    quantity: number
  ) => void;
}

const CreateProductModal: FC<IProps> = memo(
  ({ isOpen, isLoading, onClose, onSubmit: _onSubmit }) => {
    CreateProductModal.displayName = "Create product modal";
    
    const [name, setName] = useState("");
    const [name_errors, setName_errors] = useState<string[] | null>(null);
    const [description, setDescription] = useState("");
    const [description_errors, setDescription_errors] = useState<
      string[] | null
    >(null);
    const [price, setPrice] = useState("");
    const [price_errors, setPrice_errors] = useState<string[] | null>(null);
    const [quantity, setQuantity] = useState("");
    const [quantity_errors, setQuantity_errors] = useState<string[] | null>(
      null
    );

    const handleSubmit = (
      name: string,
      description: string,
      price: string,
      quantity: string
    ) => {
      if (name && description && price && price) {
        _onSubmit(name, description, Number(price), Number(quantity));
      }
    };

    const handlValidation = useCallback(() => {
      let isValid = true;

      setName_errors([]);
      setDescription_errors([]);
      setPrice_errors([]);
      setQuantity_errors([]);

      if (!description.trim()) {
        isValid = false;
        setDescription_errors(["Description is required."]);
      }

      if (!name.trim()) {
        isValid = false;
        setName_errors(["Name is required."]);
      }

      if (!price) {
        isValid = false;
        setPrice_errors(["Price is required."]);
      } else if (Number.isNaN(Number(price))) {
        isValid = false;
        setPrice_errors(["Price should be number."]);
      }

      if (!quantity) {
        isValid = false;
        setQuantity_errors(["Quantity is required."]);
      } else if (Number.isNaN(Number(quantity))) {
        isValid = false;
        setQuantity_errors(["Quantity should be number."]);
      }

      return isValid;
    }, [name, description, price, quantity]);

    useEffect(() => {
      if (!isOpen) {
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
      }
    }, [isOpen]);

    return (
      <Modal title="Create product" isOpen={isOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlValidation()
              ? handleSubmit(name, description, price, quantity)
              : null;
          }}
          className="grid grid-cols-2 gap-6"
        >
          <TextInput
            className="col-span-2"
            title="Name"
            required
            disabled={isLoading}
            loading={isLoading}
            errors={name_errors}
            value={name}
            onChange={(value) => setName(value)}
          />

          <TextareaInput
            className="col-span-2"
            title="Description"
            required
            disabled={isLoading}
            loading={isLoading}
            errors={description_errors}
            value={description}
            onChange={(value) => setDescription(value)}
          />

          <TextInput
            title="Price"
            errors={price_errors}
            required
            disabled={isLoading}
            loading={isLoading}
            value={price}
            onChange={(value) => setPrice(value)}
          />

          <TextInput
            title="Quantity"
            errors={quantity_errors}
            required
            disabled={isLoading}
            loading={isLoading}
            value={quantity}
            onChange={(value) => setQuantity(value)}
          />

          <Button
            status="success"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            Submit
          </Button>
          <Button
            status="danger"
            type="button"
            disabled={isLoading}
            loading={isLoading}
            onClick={() => onClose()}
          >
            Close
          </Button>
        </form>
      </Modal>
    );
  }
);

export default CreateProductModal;
