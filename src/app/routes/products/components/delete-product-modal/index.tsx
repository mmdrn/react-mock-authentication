import { FC, memo } from 'react'
import Modal from '../../../../components/modal'
import Button from '../../../../components/button'

interface IProps {
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onSubmit: () => void
}

const DeleteProductModal: FC<IProps> = memo(
    ({ isOpen, isLoading, onClose, onSubmit: _onSubmit }) => {
        DeleteProductModal.displayName = 'Delete product modal'

        return (
            <Modal title="Delete product" isOpen={isOpen}>
                <p className={`mb-4 ${isLoading ? 'animate-pulse' : ''}`}>
                    Are you sure you want to delete this product?
                </p>

                <form
                    id="delete-product-form"
                    className={`grid grid-cols-2 gap-6 ${isLoading ? 'animate-pulse' : ''}`}
                    onSubmit={(e) => {
                        e.preventDefault()
                        _onSubmit()
                    }}
                >
                    <Button status="danger" type="submit" disabled={isLoading} loading={isLoading}>
                        Delete
                    </Button>
                    <Button
                        status="success"
                        type="button"
                        disabled={isLoading}
                        loading={isLoading}
                        onClick={() => onClose()}
                    >
                        Close
                    </Button>
                </form>
            </Modal>
        )
    }
)

export default DeleteProductModal
