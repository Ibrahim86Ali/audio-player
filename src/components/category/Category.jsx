import { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowButtons from './ArrowButtons';
import Box from './Box';
import '../../styles/category.css';

const categories = [
  'animals',
  'food',
  'meme',
  'movie',
  'music',
  'nature',
  'news',
  'sport',
];
export default function Category({ setCategory }) {
  const [startImage, setStartImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const images = categories.map((category) => ({
    src: `src/assets/${category}.jpg`,
    category,
  }));
  const totalImages = images.length;

  const handleArrowClick = (direction) => {
    const step = 4;

    if (direction === 'left') {
      setStartImage((prevStartImage) => Math.max(0, prevStartImage - step));
      setSelectedImage(null);
    } else if (direction === 'right') {
      setStartImage((prevStartImage) =>
        Math.min(totalImages - step, prevStartImage + step)
      );
      setSelectedImage(null);
    }
  };

  const handleImageClick = (index) => {
    const displayedIndex = startImage + index;
    setCategory(images[displayedIndex].category);
    setSelectedImage(images[displayedIndex].src);
  };

  const handleBackClick = () => {
    setCategory(null);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="category-container">
        <div className="top-category">
          <p>Category</p>
          <ArrowButtons onArrowClick={handleArrowClick} />
        </div>
        <div className="bottom-category">
          {selectedImage ? (
            <>
              <Box key={0} imageSrc={selectedImage} onClick={handleBackClick} />
            </>
          ) : (
            images
              .slice(startImage, startImage + 4)
              .map((imageSrc, index) => (
                <Box
                  key={index}
                  imageSrc={imageSrc.src}
                  onClick={() => handleImageClick(index)}
                />
              ))
          )}
        </div>
      </div>
    </>
  );
}

Category.propTypes = {
  setCategory: PropTypes.func.isRequired,
};
