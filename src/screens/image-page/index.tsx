import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "../../components/header";
import { Container, FormControl, TextField } from "@mui/material";
import { serviceFetchQueryData } from "../../external/services";

const ImagePage = () => {

    const loaderRef = useRef<HTMLDivElement | null>(null); // whenever we are dealing with scrolls or intersection observer we use ref
    // we need to do somthing ince we reach a particular offset if the page
    // we can judge it using window.scrol or intersection observer
    // const [loading, setLoading] = useState(false); // on each checkpoint we will ve fetching new set of data 
    const loading = useRef(false); // this is better than using useState in this case
    const [page, setPage] = useState(1);
    const [imagesUrl, setImagesUr] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResults] = useState([]);
    
    const fetchImages = async (page : number) => {
        /**
         * new Array(10), array of size 10
         * fill(null), before modifying, if we map on array with undefined values it might lead to issue
         * also we need index not null /undefined item
         */
        loading.current = true;
        // setLoading(true);
        const response = new Array(10).fill(null).map((item, index)=> `https://picsum.photos/300/200?random=${page * 10 + index}`);
        setImagesUr((prev) => [...prev, ...response]); 
        /* 
            optimised -> if you scroll page really fast, using below ; you might get stale data, thus this ensures prev images are copied
        */
        // setImagesUr([...imagesUrl, ...response]); // we need both the responses not just the above 
        // setLoading(false);
        loading.current = false;
    }

    const handleObserver =  useCallback((entries : IntersectionObserverEntry[]) => {
        const target : any = entries[0];
        // if(target.isIntersecting && !loading )
        if(target.isIntersecting && !loading.current ) { /* 
            ------> we have memoised using useCallback, ref guarantees new value, if we use state we need it to add dependency
            ------> if we don't as the function is memoised using callback, it will always refer the previous value
        */
            // if loading false, but post scroll user reaches point where we need to load more automatically
            // we need a trigger like there is another page for which we need data
            setPage((prev : number) => prev +1);
        }
    }, [loading]) // as this is used as dependency, we need to use useCallback to memoize the whole function so that it doesn't get triggered
    // this function will be again work if loading value is changed

    useEffect(() => {
        fetchImages(page);
    }, [page]);

    useEffect(() => {
        /**
         * first we create an intersection observer, then using we pass the div ref to the intersection observer's object
         * while creating the intersection observer object, we pass the function, 
         * the function detects the intersecting div part
         * once we read the key, we can do whatever we want at that point of intersection
         */
        const observer = new IntersectionObserver(handleObserver, {
            root : null, // browser's view port is used, I can pass scrollable container element here if I am not scrolling the whole page
            rootMargin: "20px", // when the port is within20px outside the give root's bonding box, we can start firing the observer
            threshold: 0.2 // 20% target needs to be visible until you trigger the callback passed.
            // do not pass threshold, and you will see, when you scroll, it lets you scroll to the viewport length, it seems awkwardly plain
            // passing threshold, means it will let it visible 20% until it gets triggered next time
        })
        if(loaderRef.current) observer.observe(loaderRef.current);
    }, [handleObserver]); // when the function is changed, it needs new reference too
    
    const debounceSearch = () => {
        
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        serviceFetchQueryData(query);
    }

    return (
        <>
            <Header/>
            <div>
                <Container sx={{mt : 1}}>
                    <FormControl fullWidth>
                        <TextField
                            label="Search"
                            fullWidth
                            name="searchQuery"
                            value={searchQuery}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Container>
                <div style={{display : "grid", gridTemplateColumns: "repeat(3, 1fr)", gap : "10px"}}> 
                    {imagesUrl.map((src, idx)=> {
                        return (
                            <img src={src} key={idx}/>
                        )   
                    })}
                </div>
                <div ref={loaderRef} style={{height : "50px"}}></div>
            </div>
        </>

    )
}

export default ImagePage;