import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../redux/actions/actionCreators';
import api from '../tools/api';

const useSearchHandler = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [processing, setProcessing] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();

    const handleSearch = async (query: string) => {
        try {
            if (query.length > 1) {
                setProcessing(true);

                const response = await api.post('api/search', { searchQuery: query });

                if (response.data.success) {
                    setUsers(response.data.users);
                    dispatch(search({
                        searchQuery: query,
                        users: response.data.users,
                        posts: response.data.posts,
                    }));
                }
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            setProcessing(false);
        }
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeoutId = setTimeout(() => {
            handleSearch(query);
        }, 1000);

        setDebounceTimeout(timeoutId);
    };

    return { changeHandler, searchQuery, processing, users };
};

export default useSearchHandler;
