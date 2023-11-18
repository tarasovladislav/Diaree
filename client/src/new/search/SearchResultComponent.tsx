import { SearchResultsProps } from "../../Types/Types";

const SearchResultComponent: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div>
            {results.map((result, index) => (
                <div key={index}>
                    <p>{result.title}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResultComponent;