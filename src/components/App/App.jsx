import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { PixabayService } from 'components/utils';
import Searchbar from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Container, Button } from './App.styled';
import { Loader } from 'components/Loader';

const pbs = new PixabayService();
// orientation: all, imageType: all, order: most relevant
const initialQueryParams = { page: 1, perPage: 60, safesearch: true };

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const message = {
  EOS_REACHED: 'End of search reached',
  NO_SEARCH_RESULT: 'No matching search results',
};

//
// App
//

export class App extends Component {
  state = {
    status: status.IDLE,
    hits: [],
  };

  componentDidUpdate(_, prevState) {
    if (this.status === status.IDLE) return;

    if (this.status === status.REJECTED) {
      this.status = status.IDLE;
      return;
    }

    if (this.status === status.RESOLVED) {
      if (pbs.isEOSReached) {
        this.status = status.IDLE;

        return this.state.hits.length
          ? toast.info(message.EOS_REACHED)
          : toast.warn(message.NO_SEARCH_RESULT);
      }
    }
  }

  set status(value) {
    this.setState({ status: value });
  }

  get status() {
    return this.state.status;
  }

  fetchImages = async params => {
    try {
      this.status = status.PENDING;
      const resp = await pbs.fetch(params);

      this.setState(cur => ({
        hits: [...cur.hits, ...resp.data.hits],
        status: status.RESOLVED,
      }));

      // error
    } catch ({ message }) {
      this.status = status.REJECTED;
      toast.error(message);
    }
  };

  handleSearchSubmit = (_, searchQuery) => {
    this.setState({ hits: [] }, () =>
      this.fetchImages({
        ...initialQueryParams,
        q: searchQuery,
      })
    );
  };

  handleSearchQueryChange = (_, query) => {
    if (!query) this.setState({ hits: [] });
  };

  render() {
    const { handleSearchSubmit, handleSearchQueryChange, fetchImages } = this;
    const { hits } = this.state;

    return (
      <Container>
        <Loader visible={this.status === status.PENDING} />

        {/* Searchbar */}
        <Searchbar
          onSubmit={handleSearchSubmit}
          onChange={handleSearchQueryChange}
        />

        {/* Gallery */}
        <ImageGallery hits={hits} />

        {/* Load more */}
        {this.status !== status.IDLE && hits.length > 0 && (
          // () => fetchImages() чтобы избежать передачи e => {...}  в фукнцию
          <Button type="button" onClick={() => fetchImages()}>
            Load more
          </Button>
        )}

        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}
