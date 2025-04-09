import {
    Card,
    CardContent,
    CardMedia,
    Grid2,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import Navbar from "../components/navbar";
import AboutUs from "./about";
import ProductNavBar from "../components/productNav";
import { Link } from "react-router-dom";
import { AddShoppingCart } from "@mui/icons-material";
import Contact from "./contact";
import Slider from "./slider";

const DashboardBody = (props: any) => {
    return (
        <>
            <Navbar />
            <Slider />
            <AboutUs />
            <div style={{ backgroundColor: "#f6f6f6", padding: "5rem 0" }}>
                <Grid2
                    sx={{ maxWidth: 1200, margin: "auto" }}
                    container
                    spacing={2}
                >
                    <Grid2 size={12}>
                        <Typography
                            id="products-section"
                            sx={{
                                textAlign: "center",
                                transform: "translateY(-90%)",
                            }}
                            variant="h5"
                        >
                            All Products
                        </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <ProductNavBar {...props.productNavProps} />
                        {props.searchedProducts.length ? (
                            <Typography sx={{ mt: 1.5 }}>
                                Kết quả tìm kiếm cho{" "}
                                <span style={{ color: "red" }}>
                                    {props.searchValue}
                                </span>
                            </Typography>
                        ) : null}
                    </Grid2>

                    {props.query.error ? (
                        <h3
                            style={{
                                margin: "2.5rem auto 0",
                                color: "#d32f2f",
                            }}
                        >
                            Failed to load data, please reload page !
                        </h3>
                    ) : null}
                    {props.query.isLoading ? (
                        <div style={{ margin: "2.5rem auto 0" }}>
                            <h3>
                                Loading products, please wait a few seconds...
                            </h3>
                        </div>
                    ) : null}

                    {props.query.error ||
                    props.query.isLoading ||
                    props.displayedProducts.length ? (
                        props.displayedProducts?.map(
                            (product: any, index: number) => (
                                <Grid2
                                    key={index}
                                    size={{ xs: 12, sm: 6, md: 3 }}
                                >
                                    <Card className="cardProduct">
                                        <Link
                                            to={`/product/${product.title}`}
                                            state={product}
                                            target="_self"
                                        >
                                            <CardMedia
                                                style={{
                                                    backgroundImage: `url(${product.image})`,
                                                }}
                                                sx={props.cardStyle}
                                            />
                                        </Link>
                                        <CardContent>
                                            <Typography
                                                sx={props.productTitleStyle}
                                                variant="h6"
                                            >
                                                {product.title}
                                            </Typography>
                                            <Rating
                                                name="read-only"
                                                value={product.rating.rate}
                                                readOnly
                                                size="small"
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <Typography variant="subtitle1">
                                                    ${product.price}
                                                </Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        props.handleAddToCart(
                                                            product
                                                        )
                                                    }
                                                    color="primary"
                                                >
                                                    <AddShoppingCart />
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            )
                        )
                    ) : (
                        <h3 style={{ margin: "2.5rem auto 0" }}>
                            Không tìm thấy sản phẩm nào !
                        </h3>
                    )}
                </Grid2>
            </div>
            <Contact />
        </>
    );
};

export default DashboardBody;
