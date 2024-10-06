interface HeadTitleInterface {
    title: string,
    capitalize: boolean
}

export default function HeadTitle({title, capitalize = false}: HeadTitleInterface) {
    return (
        <div className="text-primary text-2xl">
            <h1>{capitalize ? title.toUpperCase() : title}</h1>
        </div>
    )
}