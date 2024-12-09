import { Card, Rate } from 'antd';
const { Meta } = Card;
import { useDoctorRatings } from '../../../hooks/useDoctorRatings';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const ReviewsCard = forwardRef(({ doctorId }, ref) => {
  const { isPending, isError, data, error } = useDoctorRatings(doctorId);
  const responseData = data?.data.data;
  return (
    <Card className="p-4 my-1 " ref={ref}>
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
              className="text-[15px]"
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
});

ReviewsCard.displayName = 'ReviewsCard';

export default ReviewsCard;

ReviewsCard.propTypes = {
  doctorId: PropTypes.string,
};
