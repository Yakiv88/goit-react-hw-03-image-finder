import { Component } from "react";
import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleQueryChange = (e) => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === "") {
      return toast.error("Enter your query!");
    }
    onSubmit(query);
    this.setState({ query: "" });
  };

  render() {
    const { handleSubmit, handleQueryChange } = this;
    const { query } = this.state;
    return (
      <div>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              name="query"
              value={query}
              onChange={handleQueryChange}
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
