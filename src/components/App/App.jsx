import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PixabayService from 'components/utils/pixabaySrv';
import { PageHeader, Container } from './App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import { ButtonPrimary as Button } from 'styles/shared';

const pbs = new PixabayService();
const initialQueryParams = { page: 1, perPage: 40 };

//
// App
//

export class App extends Component {
  state = {
    showModal: false,
    showLoader: false,
    hits: [],
  };

  componentDidUpdate() {
    console.log(this.state.hits);
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleSearchSubmit = (_, searchQuery) => {
    pbs.queryParams = {
      ...initialQueryParams,
      q: searchQuery,
    };

    this.setState({ hits: [] });
    this.fetchImages();
  };

  fetchImages = async params => {
    try {
      const resp = await pbs.fetch(params);
      this.setState(cur => ({ hits: [...cur.hits, resp.data.hits] }));
    } catch (err) {
    } finally {
    }
  };

  render() {
    const { handleModalClose, handleSearchSubmit } = this;
    const { showModal } = this.state;

    return (
      <Container>
        <PageHeader>
          <Searchbar height="75%" onSubmit={handleSearchSubmit} />
        </PageHeader>

        <Button type="button">Load more...</Button>

        {showModal && (
          <Modal onClose={handleModalClose}>
            <div
              style={{ width: 100, height: 100, backgroundColor: 'white' }}
            ></div>
          </Modal>
        )}
      </Container>
    );
  }
}
