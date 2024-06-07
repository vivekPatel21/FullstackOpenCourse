import Country from './Country';

const Content = ({ countries, setCountries }) => {
    if (countries.length >= 10) {
        return <div>Too many matches, please be more specific</div>;
    }

    if (countries.length === 0) {
        return null;
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />;
    }

    return (
        <div>
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>
                        {country.name.common}
                        <button onClick={() => setCountries([country])}>show</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Content;
