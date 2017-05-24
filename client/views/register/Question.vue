<template>
    <div>

        <div class="columns is-vcentered">
            <div class="column is-6 is-offset-3">
                <div class="box">

                    <article >
                        <h1 class="title"></h1>
                        <div class="block">

                            <label class="label">Disciplina*:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-model="question.subject_idsubject" v-on:change="getTopics">
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Assunto*:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-model="question.topic_idtopic" placeholder="Selecione o Assunto">
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Enunciado*:</label>
                            <p class="control">
                                <textarea v-model="question.enunciation" class="textarea" rows="2" placeholder="Textarea"></textarea>
                            </p>


                            <br>
                            <label class="label">Name</label>
                            <p class="control ">
                                <input class="input is-4" type="text" placeholder="Text input">
                            </p>

                            <label class="label">Username</label>
                            <p class="control has-icon has-icon-right">
                                <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                                <span class="icon is-small">
                                    <i class="fa fa-check"></i>
                                </span>
                                <span class="help is-success">This username is available</span>
                            </p>

                            <label class="label">Email</label>
                            <p class="control has-icon has-icon-right">
                                <input class="input is-danger" type="text" placeholder="Email input" value="hello@">
                                <span class="icon is-small">
                                    <i class="fa fa-warning"></i>
                                </span>
                                <span class="help is-danger">This email is invalid</span>
                            </p>

                            <label class="label">Subject</label>
                            <p class="control">
                                <span class="select">
                                    <select>
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Message</label>
                            <p class="control">
                                <textarea class="textarea" placeholder="Textarea"></textarea>
                            </p>

                            <p class="control">
                                <label class="checkbox">
                                    <input type="checkbox">
                                    Remember me
                                </label>
                            </p>

                            <p class="control">
                                <label class="radio">
                                    <input type="radio" name="question">
                                    Yes
                                </label>
                                <label class="radio">
                                    <input type="radio" name="question">
                                    No
                                </label>
                            </p>

                            <p class="control">
                                <button class="button is-primary">Submit</button>
                                <button class="button is-link">Cancel</button>
                            </p>

                        </div>
                    </article>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

export default {

    data () {
        return {
            question: {
                subject_idsubject: '',
                topic_idtopic: '',
                enunciation: '',
                bestcomment: '',
                professorcomment: '',
                alternative_answer: '',
                textassociated: '',
                test_idtest: '',
                jury_idjury: '',
                institution_idinstitution: '',
                statistic_b: '',
                a: 1,
                c: 0.25,
                alternatives: {
                    a: '',
                    b: '',
                    c: '',
                    d: ''
                },
            }
        }
    },

    created () {

    },

    methods: {
        getTopics: function() {
            this.$http.get('http://devapi.examedaoab.com/api/dashboard/get-topics/'+this.question.subject_idsubject).then((response) => {
                this.topics = response.body.topic
                console.log(this.topics)
            });
        }
    }
}
</script>
