const STATE_METADATA_KEY = 'state';

export function State(state: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(STATE_METADATA_KEY, state, target);
    };
}

export function getState(target: any): string | undefined {
    return Reflect.getMetadata(STATE_METADATA_KEY, target);
}
