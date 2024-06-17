import { createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
    name: "reviewData",
    initialState: {
        reviewData: [
            {
                productId: 1,
                reviews: [
                    {
                        clickedLike: false,
                        clickedDisLike: false,
                        id: "b52a0a1e-430a-458c-aeb0-039f6231f224",
                        customerName: 'josh',
                        commentText: 'The Smart Speaker with Alexa Voice Control Built-in is a game-changer for my home. Not only does it deliver immersive audio, but it also acts as a hub for controlling my smart home devices.',
                        likes: 0,
                        dislikes: 0,
                        userPic: '../images/user.png',
                    },
                    {
                        clickedLike: false,
                        clickedDisLike: false,
                        id: "b52a0a8e-430a-128c-aeb8-039f6231f113",
                        customerName: 'Gina',
                        commentText: 'I recently purchased the Smart Speaker with Alexa Voice Control Built-in, and it has exceeded my expectations. The sound quality is impressive, with rich bass and clear vocals. ',
                        likes: 1,
                        dislikes: 0,
                        userPic: '../images/user.png',
                    },
                ]
            },
            {
                productId: 2,
                reviews: []
            },
            {
                productId: 3,
                reviews: []
            },
            {
                productId: 4,
                reviews: []
            },
            {
                productId: 5,
                reviews: []
            },
            {
                productId: 6,
                reviews: []
            },
            {
                productId: 7,
                reviews: []
            },
            {
                productId: 8,
                reviews: []
            },
            {
                productId: 11,
                reviews: []
            },
            {
                productId: 12,
                reviews: []
            },
            {
                productId: 13,
                reviews: []
            },
            {
                productId: 14,
                reviews: []
            },
            {
                productId: 15,
                reviews: []
            },
            {
                productId: 16,
                reviews: []
            },
            {
                productId: 17,
                reviews: []
            },
            {
                productId: 18,
                reviews: []
            },
            {
                productId: 19,
                reviews: []
            },
            {
                productId: 20,
                reviews: []
            },
            {
                productId: 21,
                reviews: []
            },
            {
                productId: 22,
                reviews: []
            },
            {
                productId: 23,
                reviews: []
            },
            {
                productId: 24,
                reviews: []
            },
            {
                productId: 25,
                reviews: []
            },
            {
                productId: 26,
                reviews: []
            },
            {
                productId: 27,
                reviews: []
            },
            {
                productId: 28,
                reviews: []
            },
            {
                productId: 29,
                reviews: []
            },
            {
                productId: 30,
                reviews: []
            },
            {
                productId: 31,
                reviews: []
            },
            {
                productId: 32,
                reviews: []
            },
            {
                productId: 33,
                reviews: []
            },
            {
                productId: 34,
                reviews: []
            },
        ],
    },
    reducers: {
        addReview: (state, action) => {
            const productId = action.payload.productId
            const reviewData = action.payload.reviewData
            state.reviewData = state.reviewData.map((review) => {
                return review.productId == productId ? { ...review, reviews: [...review.reviews, reviewData] } : review;
            })
        },
        incLike: (state, action) => {
            const { productId, reviewId, isDisliked } = action.payload;

            state.reviewData = state.reviewData.map((product) => {
                if (product.productId === productId) {
                    return {
                        ...product,
                        reviews: product.reviews.map((review) => {
                            if (review.id === reviewId) {
                                const likeIncrement = !review.clickedLike ? 1 : -1;
                                const dislikeIncrement = review.clickedDisLike ? -1 : 0;

                                return {
                                    ...review,
                                    clickedLike: !review.clickedLike,
                                    clickedDisLike: false,
                                    likes: review.likes + likeIncrement,
                                    dislikes: review.dislikes + dislikeIncrement,
                                };
                            }
                            return review;
                        }),
                    };
                }
                return product;
            });
        },

        incDisLike: (state, action) => {
            const { productId, reviewId, isLiked } = action.payload;

            state.reviewData = state.reviewData.map((product) => {
                if (product.productId === productId) {
                    return {
                        ...product,
                        reviews: product.reviews.map((review) => {
                            if (review.id === reviewId) {
                                const dislikeIncrement = !review.clickedDisLike ? 1 : -1;
                                const likeIncrement = review.clickedLike ? -1 : 0;

                                return {
                                    ...review,
                                    clickedDisLike: !review.clickedDisLike,
                                    clickedLike: false,
                                    dislikes: review.dislikes + dislikeIncrement,
                                    likes: review.likes + likeIncrement,
                                };
                            }
                            return review;
                        }),
                    };
                }
                return product;
            });
        },

        removeReview: (state, action) => {
            const { productId, reviewId } = action.payload;
          
            state.reviewData = state.reviewData.map((product) => {
              if (product.productId === productId) {
                return {
                  ...product,
                  reviews: product.reviews.filter((review) => review.id !== reviewId)
                };
              }
              return product;
            });
          },

        saveEditedReview: (state, action) => {
            const {productId, reviewId, editedReview} = action.payload

            state.reviewData = state.reviewData.map((product) => {
                if (product.productId === productId) {
                    return {
                        ...product,
                        reviews: product.reviews.map((review) => {
                            if (review.id === reviewId) {
                                return {
                                    ...review, 
                                    commentText: editedReview, 
                                }
                            }
                            return review
                        })
                    }
                }
                return product
            })
        }
          
    },
});

export default reviewSlice.reducer;

export const { addReview, incLike, incDisLike, removeReview, saveEditedReview } = reviewSlice.actions;