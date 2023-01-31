function ReviewIndex(review){
    console.log('we got into the component', review)
    const reviewItem = review.review
    return(
        <div>
            {reviewItem.content}
        </div>
    )
}

export default ReviewIndex
