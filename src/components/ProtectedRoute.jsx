import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (!user) {
        return (
            <AuthModal 
                isOpen={true} 
                onClose={() => setShowAuthModal(false)} 
            />
        );
    }

    return children;
}

export default ProtectedRoute;