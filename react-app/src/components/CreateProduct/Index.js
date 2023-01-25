import './index.css';

function CreateProductForm(){
    return(
        <>
            <form className="create-product-form">
                <label className='create-product-label'>
                    Name
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Description
                    <input className='create-product-input' />
                </label>
                <label className='create-product-label'>
                    Price
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Quantity
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Options
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    PreviewImg
                    <input className='create-product-input'/>
                </label>
                <button className='creater-product-button'>Create a product</button>
            </form>
        </>
    )
}

export default CreateProductForm
