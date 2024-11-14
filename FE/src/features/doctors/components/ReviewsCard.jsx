import { Card, Rate } from 'antd';
const { Meta } = Card;
import { useDoctorRatings } from '../../../hooks/useDoctorRatings';

const ReviewsCard = ({ doctorId }) => {
  const { isPending, isError, data, error } = useDoctorRatings(doctorId);
  const responseData = data?.data.data;
  return (
    <Card className="p-4 my-1 ">
      <Meta title="Reviews" />
      <br />
      <div className="flex flex-col space-y-1">
        {responseData?.ratings.map((review) => (
          <Card key={review.appointment_id}>
            {' '}
            <Rate
              allowHalf
              disabled
              defaultValue={review.rating}
              style={{ fontSize: 15 }}
            />{' '}
            {review.rating}
            <p>{new Date(review.created_at).toLocaleString('en-AU')}</p>
            <br />
            <p>{review.comment_rating}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ReviewsCard;
