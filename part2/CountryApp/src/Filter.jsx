import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
    return (
        <div>
            country search <input value={value} onChange={onChange} />
        </div>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filter;
