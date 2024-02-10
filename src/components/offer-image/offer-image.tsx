type OfferImageProps = {
  imagePath: string;
};

const OfferImage = ({imagePath}: OfferImageProps): JSX.Element => (
  <div className="offer__image-wrapper">
    <img
      className="offer__image"
      src={imagePath}
      alt="Photo studio"
    />
  </div>
);

export default OfferImage;
