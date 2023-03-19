import { useSelector } from "react-redux"
import { EditReviewFormModal } from "./CreateEditReview"
import { DeleteReviewFormModal } from "./DeleteReview"

function ReviewIndex(review, productId){
    const user = useSelector(state => state.session.user)
    const reviewItem = review.review

    const date = new  Date(reviewItem.time)

    const displayDateHolder = date.toString().split(' ')

    const month = displayDateHolder[1]
    const day = displayDateHolder[2]
    const year = displayDateHolder[3]


    const findStars = (avg) => {
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
                    {
                        user && user?.username ===  reviewItem?.username ? <div>
                        <EditReviewFormModal productId={productId} review={reviewItem}/>
                        <DeleteReviewFormModal review={reviewItem}/>
                        </div> : <></>
                    }

                </div>
                <div>
                    {reviewItem.content}
                </div>
                <div className="review-user-container">
                    <img className="review-user-img" 
                    onError={e => { e.currentTarget.src = "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"}}
                    src={reviewItem.profileImg === null ? "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top" : reviewItem.profileImg }
                    ></img>
                    <div>{reviewItem.username}</div>
                    <div>{`${month} ${day}, ${year}`}</div>

                </div>
                <div className="review-button-container">

                </div>
            </div>
            <img className={reviewItem?.reviewImg.length > 0 ? "review-index-img" : 'review-index-img-hidden'}
                onError={e => { e.currentTarget.src = "https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png"}}
                src={reviewItem?.reviewImg}></img>

        </div>
    )
}

export default ReviewIndex
