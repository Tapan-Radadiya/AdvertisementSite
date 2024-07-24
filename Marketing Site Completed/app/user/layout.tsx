export default function Header({ children }: any) {
    return (
        <>
            <div className="container-fluid">
                <p className="ml-5 mt-2 user-select-none" style={{ fontSize: "30px" }}> <span className="text-primary">Quiz</span><input type="radio" style={{ zoom: "1.5" }} defaultChecked />Nest</p>
            </div>
            <section>{children}</section>
        </>
    )
}