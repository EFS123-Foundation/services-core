import m from 'mithril';
import projectCancelButton from '../../src/c/project-cancel-button';

describe('ProjectCancelButton', () => {
    let project, $output,
        c = window.c;

    describe('view', () => {
        beforeAll(() => {
            project = ProjectMockery()[0];
            $output = mq(m.component(projectCancelButton, {
                category: {
                    project: project
                }
            }));
        });

        it('should build a link with .btn-cancel', function() {
            expect($output.has('a.btn-cancel')).toBeTrue();
        });
    });
});
