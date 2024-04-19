
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { Add_authenticate, addNewFriends, addNewMessages, addSuggestFriend } from '../redux/actions/actionCreators';
import api from "../tools/api";
const fetchUser = async () => {
    const response = await api.get(`/api/user`,)
    return response.data
}
export const useUser = () => {


    const dispatch = useDispatch()


    const { data, isLoading, error } = useQuery("data", fetchUser, {
    })


    return { data, isLoading, error }
}

