import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk('products/fetchProducts',async()=>{
    const response = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data');

    return response.data
});

const applyFilter = (items, searchTerm, selectedPriceOptions)=>{
    return items.filter((item)=>{
        const matchSerach = item.title.toLowerCase().includes((searchTerm || '').toLowerCase());
        const getPricingLabel = (val) => {
            switch (val) {
            case 0: return 'Paid';
            case 1: return 'Free';
            case 2: return 'View Only';
            default: return '';
            }
        };const pricingLabel = getPricingLabel(item.pricingOption);
      const matchesPricing = selectedPriceOptions.length === 0 || selectedPriceOptions.includes(pricingLabel);
      
        return matchSerach && matchesPricing 
    })
}

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        filtered: [],
        searchTerm: '',
        selectedPriceOptions: [],
        sortProducts:[],
        isLoading: false,
        error: '',
    },
    reducers: {
        searchProducts: (state, action)=>{
            state.searchTerm = action.payload.trim().toLowerCase();
            state.filtered = applyFilter(state.items, state.searchTerm, state.selectedPriceOptions) 
        },
        filterByPrice: (state, action)=>{
            state.selectedPriceOptions = action.payload;
            state.filtered = applyFilter(state.items, state.searchTerm, state.selectedPriceOptions)
        },
        sortProducts: (state, action)=>{
            const criteria = action.payload;
            const sortFunc = {
                ItemName: (a, b)=> a.title.localeCompare(b.title),
                HigherPrice: (a,b)=> b.price - a.price,
                LowerPrice: (a, b) => a.price - b.price,
            }

            state.filtered = [...state.filtered].sort(sortFunc[criteria]  || sortFunc.ItemName)
        },
        clearFilters: (state)=>{
           state.searchTerm  = '';
           state.selectedPriceOptions = [];
           state.filtered = state.items;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchProduct.pending,(state)=>{
            state.isLoading = true;
            state.error = '';
        })
        .addCase(fetchProduct.fulfilled, (state, action)=>{
            state.items = action.payload;
            state.filtered = action.payload;
            state.isLoading = false;

        })
        .addCase(fetchProduct.rejected, (state, action)=>{
            state.error = action.error.message;
            state.isLoading = false 
        })
    },
});

export const {searchProducts, filterByPrice, clearFilters, sortProducts } = productSlice.actions;
export default productSlice.reducer;