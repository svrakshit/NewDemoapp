import { mmkvStorage } from "../service/storage";
import { Href, useRouter } from "expo-router";  // Removed generic
import { useLocalSearchParams } from "expo-router";
// import * as Haptics from 'expo-haptics';

export const resetAndNavigate = (newPath: Href) => {  // No need for generic here
    const router = useRouter();  
    if (router.canGoBack()) {
        router.dismissAll();
    }
    router.replace(newPath);
};

export const backScreen = () => {
    const router = useRouter();  // Ensure useRouter() is used
    router.back();
};

export const navigateToScreen = (newPath: string, queryParams: Record<string, string> = {}) => {
    const router = useRouter();  // Ensure useRouter() is used
    const queryString = new URLSearchParams(queryParams).toString();
    const finalPath = queryString ? `${newPath}?${queryString}` : newPath;
    router.push(finalPath);
};

export const useQueryParams = () => {
    const params = useLocalSearchParams();
    return params;
};

export const processLogout = async () => {
    try {
        await clearUserSession();
    
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

// Helper function to clear user session
const clearUserSession = async () => {
    mmkvStorage.removeItem('token');
    mmkvStorage.removeItem('userinfo');
    console.log("User session cleared");
};
