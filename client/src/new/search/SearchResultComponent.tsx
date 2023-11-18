import { SearchResultsProps } from "../../Types/Types";

const SearchResultComponent: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div>
            {results.map((result, index) => (
                <div key={index}>
                    <h3>{result.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default SearchResultComponent;