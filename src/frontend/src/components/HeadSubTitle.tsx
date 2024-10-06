interface HeadSubTitleInterface {
    title: string,
    capitalize: boolean
}

export default function HeadSubTitle({title, capitalize = false}: HeadSubTitleInterface) {
    return (
        <div className="text-primary italic text-xl/8">
            <h2>{capitalize ? title.toUpperCase() : title}</h2>
        </div>
    )
}