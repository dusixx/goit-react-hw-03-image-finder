import { Component } from 'react';
import { string } from 'prop-types';
import Modal from 'components/Modal/Modal';
import { Link, Image, Thumb, Desc, Container } from './ImageGalleryItem.styled';
import { Spinner } from 'components/Loader/Loader';

const COLOR_MODAL_BG = 'rgb(255 255 255 / 0.7)';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    url: string,
    tags: string,
    preview: string,
  };

  state = { clickedImage: null, showModal: false };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleImageClick = (e, clickedImage) => {
    e.preventDefault();
    this.setState({ clickedImage, showModal: true });
  };

  handleModalImgLoaded = e => {
    this.setState(cur => ({
      clickedImage: { ...cur.clickedImage, isLoaded: true },
    }));
  };

  render() {
    const { handleImageClick, handleModalClose, handleModalImgLoaded } = this;
    const { url, tags, preview } = this.props;
    const { clickedImage: img, showModal } = this.state;

    return (
      <>
        <Link href={url} onClick={e => handleImageClick(e, { url, tags })}>
          <Image src={preview} alt={tags} loading="lazy" />
        </Link>

        {showModal && (
          <Modal onClose={handleModalClose} bgColor={COLOR_MODAL_BG}>
            <Container>
              <Spinner width={40} visible={!img.isLoaded} />
              <Thumb>
                <img
                  src={img.url}
                  alt={img.tags}
                  onLoad={handleModalImgLoaded}
                />
                {img.isLoaded && <Desc>{img.tags}</Desc>}
              </Thumb>
            </Container>
          </Modal>
        )}
      </>
    );
  }
}
