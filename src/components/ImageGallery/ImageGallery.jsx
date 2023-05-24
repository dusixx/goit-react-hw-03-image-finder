import { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import Modal from 'components/Modal/Modal';

import {
  List,
  ListItem,
  Link,
  Image,
  Thumb,
  Desc,
} from './ImageGallery.styled';

// id с бекенда не всегда уникальны (повтор изображений)
// коллекция статична - берем в качестве id число
let id = 0;
const COLOR_MODAL_BG = 'rgb(255 255 255 / 0.8)';

export class ImageGallery extends Component {
  static propTypes = {
    onClick: func,
    hits: arrayOf(
      shape({
        webformatURL: string,
        largeImageURL: string,
        tags: string,
      })
    ),
  };

  state = { clickedImage: null, showModal: false };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleImageClick = (e, clickedImage) => {
    e.preventDefault();
    this.setState({ clickedImage, showModal: true });
  };

  render() {
    const { hits } = this.props;
    const { showModal, clickedImage } = this.state;
    const { handleModalClose, handleImageClick } = this;

    return (
      <>
        <List>
          {hits.map(({ webformatURL, largeImageURL, tags }) => (
            <ListItem key={id++}>
              <Link
                href={largeImageURL}
                onClick={e => handleImageClick(e, { url: largeImageURL, tags })}
              >
                <Image src={webformatURL} alt={tags} />
              </Link>
            </ListItem>
          ))}
        </List>

        {showModal && (
          <Modal onClose={handleModalClose} bgColor={COLOR_MODAL_BG}>
            <Thumb>
              <img src={clickedImage.url} alt={clickedImage.tags} />
              <Desc>{clickedImage.tags}</Desc>
            </Thumb>
          </Modal>
        )}
      </>
    );
  }
}
