import { createSlice } from "@reduxjs/toolkit";
import { CarouselModel } from "../../../domain/models/CarouselModel";

const initialState: CarouselModel[] = [
    new CarouselModel('banner01', '', '', 'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_web_pc_1610x492_c9e94cade9.jpg'),
    new CarouselModel('banner02', '', '', 'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1610x492_1_b4bfca5c96.jpg'),
    new CarouselModel('banner03', '', '', 'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/web_pc_1610x492_ee62a3a853.jpg'),
    new CarouselModel('banner03', '', '', 'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Bannerweb_PC_1610x492_d509727673.png'),

]
const BannerSlice = createSlice({

    name: 'banner',
    initialState: initialState,
    reducers: {
    }
})

export default BannerSlice.reducer;