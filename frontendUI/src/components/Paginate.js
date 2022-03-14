import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function Paginate({pages, page, keyword='', isAdmin=false}) {
    
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (
        pages > 1 && (
            <Pagination>
                <LinkContainer 
                        to={!isAdmin ?
                            `/?keyword=${keyword}&page=${1}`
                            : `/admin/productlist/?keyword=${keyword}&page=${1}`
                        }
                    >
                      <Pagination.First />
                </LinkContainer>
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer 
                        key={x+1}
                        to={!isAdmin ?
                            `/?keyword=${keyword}&page=${x + 1}`
                            : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                        }
                    >
                      <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))}
                <LinkContainer 
                        to={!isAdmin ?
                            `/?keyword=${keyword}&page=${pages}`
                            : `/admin/productlist/?keyword=${keyword}&page=${pages}`
                        }
                    >
                      <Pagination.Last />
                </LinkContainer>
            </Pagination>
        )
    )
}

