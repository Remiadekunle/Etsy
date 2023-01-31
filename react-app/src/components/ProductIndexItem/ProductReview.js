function ReviewIndex(review){
    console.log('we got into the component', review)
    const reviewItem = review.review

    const date = new  Date(reviewItem.time)
    console.log('were checking the date', date.toString())
    const displayDateHolder = date.toString().split(' ')
    console.log('were checking the date', displayDateHolder)
    const month = displayDateHolder[1]
    const day = displayDateHolder[2]
    const year = displayDateHolder[3]

    const findStars = (avg) => {
        console.log('testing the type', typeof avg)
        if (avg === 0) return 'No Reviews'
        if (avg >  0 && avg <= 1) return <i class="fa-solid fa-star fa-xs"></i>
        else if (avg >=  1 && avg < 2) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  2 && avg < 3) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  3 && avg < 4) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  4 && avg < 5) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>

        )}
        else{
            return(
                <div>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                </div>
            )
        }

    }
    return(
        <div className="review-index-container">
            <div className="review-index-content-container">
                <div className="review-index-stars">
                    {findStars(reviewItem.stars)}
                </div>
                <div>
                    {reviewItem.content}
                </div>
                <div className="review-user-container">
                    <img className="review-user-img" src="https://i.pinimg.com/originals/b1/92/4d/b1924dce177345b5485bb5490ab3441f.jpg"></img>
                    <div>{reviewItem.username}</div>
                    <div>{`${month} ${day}, ${year}`}</div>
                </div>
            </div>
            <img className={reviewItem?.reviewImg.length > 0 ? "review-index-img" : 'review-index-img-hidden'} src={reviewItem?.reviewImg}></img>
            <div className="review-button-container">
                <button  className="review-index-buttons"><i class="fa-regular fa-pen-to-square fa-2xl"></i></button>
                <button className="review-index-buttons"><i class="fa-regular fa-trash-can fa-2xl"></i></button>
            </div>
        </div>
    )
}

export default ReviewIndex
