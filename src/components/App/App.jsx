import { Component } from 'react';
import { PixabayService } from 'components/utils';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Container, Button } from './App.styled';
import { Loader } from 'components/Loader/Loader';

const pbs = new PixabayService();
const initialQueryParams = { page: 1, perPage: 60, safesearch: true };

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MSG_EOS_REACHED = 'End of search reached';
const MSG_NO_SEARCH_RESULT = 'No matching search results';

//
// App
//

export class App extends Component {
  state = {
    status: status.IDLE,
    hits: [],
  };

  componentDidUpdate(_, prevState) {
    if (this.state.status === status.IDLE) return;

    if (this.state.status === status.RESOLVED) {
      if (pbs.isEOSReached) {
        this.status = status.IDLE;

        return toast.info(
          this.state.hits.length ? MSG_EOS_REACHED : MSG_NO_SEARCH_RESULT
        );
      }
    }

    if (this.state.status === status.REJECTED) {
      this.status = status.IDLE;
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
    pbs.queryParams = {
      ...initialQueryParams,
      q: searchQuery,
    };
    this.setState({ hits: [] });
    this.fetchImages();
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

        <Header>
          <Searchbar
            height="75%"
            onSubmit={handleSearchSubmit}
            onChange={handleSearchQueryChange}
          />
        </Header>
        <ImageGallery hits={hits} />
        {this.status !== status.IDLE && hits.length > 0 && (
          <Button type="button" onClick={() => fetchImages()}>
            Load more
          </Button>
        )}
        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}
