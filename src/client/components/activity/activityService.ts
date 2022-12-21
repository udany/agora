import { Component } from '@vue/runtime-core';
import { inject, provide, reactive, markRaw } from 'vue';

export declare type ComponentDescriptor<Props> = {
	component: Component<Props>;
	props?: Props;
	listeners?: Object;
}

export declare type ActivityProps = { visible: boolean };
export declare type ActivityDescriptor<Props extends ActivityProps> = ComponentDescriptor<Props> & {
	id?: number
};

export class ActivityContext {
	maxId: number = 1;
	activityStack: ActivityDescriptor<any>[] = [].unique(true);

	push(activity: ActivityDescriptor<any>) {
		this.activityStack.push({
			listeners: [],
			props: {},
			...activity,
			id: this.maxId++,
			component: markRaw(activity.component),
		});
	}

	pop() {
		if (this.activityStack.length === 1) return;

		this.activityStack.pop();
	}
}

const activityContextKey = 'activityContext'

export function getActivityContext(): ActivityContext {
	let ctx = inject<ActivityContext>(activityContextKey);

	if (!ctx) {
		console.error('No activity context found');
	}

	return ctx;
}

export function createActivityContext(): ActivityContext {
	let ctx = reactive(new ActivityContext());

	provide<ActivityContext>(activityContextKey, ctx);

	return ctx;
}
