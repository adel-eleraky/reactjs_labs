import ProductCard from "../components/ProductCard"

export function renderProducts(products) {
    return products.map(product => {
        return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                <ProductCard
                    product={product}
                />
            </div>
        )
    })
}

