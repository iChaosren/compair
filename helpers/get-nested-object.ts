
export default function getNestedObject<T>(obj: any, name: string): T {
    var subItems = name.split('.');
    var current = obj;
    for (let index = 0; index < subItems.length; index++) {
        const nextName = subItems[index];
        if(!current[nextName])
            return undefined;

        current = current[nextName];
    }
    return current;
}
