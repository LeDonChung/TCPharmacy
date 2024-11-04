import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "../../../domain/models/CategoryModel";

const initialState: CategoryModel[] = [
    {
        id: 'thucPhamChucNang',
        title: 'Thực phẩm chức năng',
        icon: require('./../../../../assets/icon/menuCategories/vitamin 1.png'),
        
        category: [
            {
                id: 'menuCategory1',
                icon: require('./../../../../assets/icon/menuCategories/vitamin 1.png'),
                title: 'Vitamin & Khoáng chất',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory2',
                icon: require('./../../../../assets/icon/menuCategories/SinhLy-NoiTiet 1.png'),
                title: 'Sinh lý - Nội tiết tố',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory3',
                icon: require('./../../../../assets/icon/menuCategories/CaiThienTangCuong 1.png'),
                title: 'Cải thiện tăng cường',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory4',
                icon: require('./../../../../assets/icon/menuCategories/HoTroDieuTri 1.png'),
                title: 'Hỗ trợ điều trị',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory5',
                icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
                title: 'Hỗ trợ tiêu hóa',
                
                category: [
                    {
                        id: 'menuCategory5.1',
                        icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
                        title: 'Hỗ trợ tiêu hóa 1',
                        category: [],
                        parentCategory: {
                            id: 'menuCategory5'
                        } as CategoryModel
                    },
                    {
                        id: 'menuCategory5.2',
                        icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
                        title: 'Hỗ trợ tiêu hóa 2',
                        category: [],
                        parentCategory: {
                            id: 'menuCategory5'
                        } as CategoryModel
                    },
                    {
                        id: 'menuCategory5.3',
                        icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
                        title: 'Hỗ trợ tiêu hóa 3',
                        category: [],
                        parentCategory: {
                            id: 'menuCategory5'
                        } as CategoryModel
                    },
                    {
                        id: 'menuCategory5.4',
                        icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
                        title: 'Hỗ trợ tiêu hóa 4',
                        category: [],
                        parentCategory: {
                            id: 'menuCategory5'
                        } as CategoryModel
                    }
                ],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory6',
                icon: require('./../../../../assets/icon/menuCategories/ThanKinhNao 1.png'),
                title: 'Thần kinh não',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory7',
                icon: require('./../../../../assets/icon/menuCategories/1.png'),
                title: 'Sức khỏe tim mạch',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory8',
                icon: require('./../../../../assets/icon/menuCategories/4.png'),
                title: 'Hỗ trợ làm đẹp',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory9',
                icon: require('./../../../../assets/icon/menuCategories/2.png'),
                title: 'Dinh dưỡng',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory10',
                icon: require('./../../../../assets/icon/menuCategories/6.png'),
                title: 'Hỗ trợ tình dục',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory11',
                icon: require('./../../../../assets/icon/menuCategories/3.png'),
                title: 'Giải pháp làn da',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            },
            {
                id: 'menuCategory12',
                icon: require('./../../../../assets/icon/menuCategories/5.png'),
                title: 'Chăm sóc da mặt',
                
                category: [],
                parentCategory: {
                    id: 'thucPhamChucNang'
                } as CategoryModel
            }
        ],
        parentCategory: {} as CategoryModel
    },
    {
        id: 'duocMyPham',
        title: 'Dược mỹ phẩm',
        icon: require('./../../../../assets/icon/menuCategories/vitamin 1.png'),
        
        category: [
            {
                id: 'menuCategory1',
                icon: require('./../../../../assets/icon/menuCategories/vitamin 1.png'),
                title: 'Vitamin & Khoáng chất',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory2',
                icon: require('./../../../../assets/icon/menuCategories/SinhLy-NoiTiet 1.png'),
                title: 'Sinh lý - Nội tiết tố',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory3',
                icon: require('./../../../../assets/icon/menuCategories/CaiThienTangCuong 1.png'),
                title: 'Cải thiện tăng cường',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory4',
                icon: require('./../../../../assets/icon/menuCategories/HoTroDieuTri 1.png'),
                title: 'Hỗ trợ điều trị',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory5',
                icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
                title: 'Hỗ trợ tiêu hóa',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory6',
                icon: require('./../../../../assets/icon/menuCategories/ThanKinhNao 1.png'),
                title: 'Thần kinh não',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory7',
                icon: require('./../../../../assets/icon/menuCategories/1.png'),
                title: 'Sức khỏe tim mạch',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory8',
                icon: require('./../../../../assets/icon/menuCategories/4.png'),
                title: 'Hỗ trợ làm đẹp',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory9',
                icon: require('./../../../../assets/icon/menuCategories/2.png'),
                title: 'Dinh dưỡng',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory10',
                icon: require('./../../../../assets/icon/menuCategories/6.png'),
                title: 'Hỗ trợ tình dục',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory11',
                icon: require('./../../../../assets/icon/menuCategories/3.png'),
                title: 'Giải pháp làn da',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            },
            {
                id: 'menuCategory12',
                icon: require('./../../../../assets/icon/menuCategories/5.png'),
                title: 'Chăm sóc da mặt',
                
                category: [],
                parentCategory: {
                    id: 'duocMyPham'
                } as CategoryModel
            }
        ],
        parentCategory: {} as CategoryModel
    }
]

const CategorySlice = createSlice({
    name: 'category',
    initialState: {value: initialState, search: initialState, parentCategory: {} as CategoryModel, category: {} as CategoryModel},
    reducers: {
        getCategoryByParentCategoryId: (state, action) => {
            let result = state.value.filter(category => category.id === action.payload.parentId)
            console.log(result) 
            state.category = {...result[0]}
        },
        getCategoryParent(state, action) {
            let result = state.value.filter(category => category.id === action.payload.parentId)
            state.parentCategory = {...result[0]}
        },
        searchCategoryByParentId(state, action) {
            let result = state.value.filter(category => category.id === action.payload.parentId)
            state.search = [...result]
        },
        setCategorySearch(state, action) {
            state.search = [...action.payload]
        }
    }
})

export const { getCategoryByParentCategoryId, getCategoryParent, searchCategoryByParentId, setCategorySearch } = CategorySlice.actions

export default CategorySlice.reducer