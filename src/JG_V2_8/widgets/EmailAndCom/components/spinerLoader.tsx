type SpinerLoaderProp = {
    classes?: string
}
const SpinerLoader = ({ classes }: SpinerLoaderProp) => (
    <span
        className={`inline-block animate-spin rounded-full border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${classes ? classes : "h-4 w-4 border-2 border-dotted border-current"}`}
        role="status">
        <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
        >
    </span>

)
export default SpinerLoader