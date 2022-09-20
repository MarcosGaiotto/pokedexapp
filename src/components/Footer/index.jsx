import './styles.css';

export function Footer(props) {
    return (
        <footer className="page-info">
            {props.children}
        </footer>
    )
}