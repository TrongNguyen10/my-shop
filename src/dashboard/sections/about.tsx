import React from "react";
import { Typography, Box, Card, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid2";

const member = [
    {
        img: "https://pbs.twimg.com/media/GGvjWeoawAA7ovM.jpg",
        name: "Martin Odegaard",
        position: "CEO",
    },
    {
        img: "https://cdn1.hammers.news/uploads/25/2024/06/GettyImages-2159372096-scaled.jpg",
        name: "Ricardo Calafiori",
        position: "Manager",
    },
    {
        img: "https://www.highsnobiety.com/static-assets/dato/1694784507-230824_ashnarod_adidas_shot03_017.jpg",
        name: "Declan Rice",
        position: "Model",
    },
];

const memberStyle = {
    paddingTop: "100%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
};

const AboutUs: React.FC = () => {
    return (
        <Box
            id="aboutus-section"
            sx={{ maxWidth: 1200, m: "5rem auto", textAlign: "center" }}
        >
            <Typography variant="h4">Vì sao chọn chúng tôi</Typography>
            <Typography
                sx={{ width: "70%", m: "2rem auto", lineHeight: 2 }}
                variant="body1"
            >
                Được thành lập vào năm 2024. NDT Shop luôn cố gắng mang lại
                những sản phẩm chất lượng nhất cho khách hàng. Thương hiệu được
                xây dựng từ những tên tuổi hàng đầu trong lĩnh vực thời trang và
                điện tử. Chúng tôi sẽ bùng nổ hơn nữa trong tương lai. Đây là
                nơi chúng tôi chia sẻ giá trị và sứ mệnh của NDT Shop. Với
                phương châm hoạt động: Hãy đến với chúng tôi! Bạn sẽ thấy hài
                lòng! Với đội ngũ lãnh đạo giàu kinh nghiệm cùng với những nhân
                viên trẻ tài năng. Chúng tôi cam kết mang đến cho khách hàng
                những trải nghiệm tốt nhất.
            </Typography>
            <Grid sx={{ display: "flex" }} container spacing={2}>
                {member.map((member, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardMedia
                                style={{
                                    backgroundImage: `url(${member.img})`,
                                }}
                                sx={memberStyle}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {member.name}
                                </Typography>
                                <Typography variant="body1">
                                    {member.position}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography
                sx={{ fontStyle: "italic", textAlign: "center", mt: 3 }}
                variant="body1"
            >
                Những nhà sáng lập NDT Shop
            </Typography>
        </Box>
    );
};

export default AboutUs;
