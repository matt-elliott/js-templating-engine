(() => {
  const view = document.querySelector('#view');
  const utf8Decoder = new TextDecoder('utf-8');
  const variableRegx = /{{\w+}}/gm;

  // MOCK JSON DATA
  const messageData = [
    {
      template_title: 'This is Template Number 1!',
      template_sub_title: 'This is the best template man!',
      body_copy: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste impedit cupiditate atque ea minima sit, qui quas at vitae quidem veniam. Quibusdam expedita labore id dicta voluptatibus, sunt deleniti laudantium atque inventore vero eum velit quasi cupiditate blanditiis ab? Optio veritatis quos et consequuntur atque fugit, eaque illum. Exercitationem quas quia tenetur velit neque dolorum, reiciendis blanditiis et deserunt aspernatur dolor placeat cupiditate nemo, iste deleniti. Incidunt repellendus quas eius! Quae eius, nostrum similique sunt saepe nemo obcaecati perferendis ea libero porro doloribus illo itaque vero nesciunt a quos dolor earum iste rerum inventore odit numquam doloremque voluptatibus? Quod atque doloremque sint modi rem, animi facilis amet iusto voluptate saepe similique repudiandae voluptatem magnam ducimus omnis? Veniam asperiores tempore a deleniti iure, voluptates distinctio, laudantium odit, placeat beatae repellat architecto doloremque quis voluptatem aperiam iste cupiditate necessitatibus vero saepe nulla? Vero qui cupiditate laudantium facere sequi ratione consequuntur consectetur commodi quis magni vel labore aut saepe omnis, sunt enim corrupti suscipit quod eius placeat fugiat. Itaque eos molestias optio eius facilis esse corporis aperiam minima qui magni. Amet excepturi, officia voluptate nostrum cum, eaque sunt voluptates blanditiis eos perferendis ipsum illum. Cupiditate, repudiandae voluptates? Corporis sunt numquam dignissimos soluta illum.',
      cover_image: 'https://picsum.photos/666/368',
    },
    {
      template_title: 'This is Template Number 2!',
      template_sub_title: 'This is the next best template, YEA!!',
      body_copy: 'Incidunt repellendus quas eius! Quae eius, nostrum similique sunt saepe nemo obcaecati perferendis ea libero porro doloribus illo itaque vero nesciunt a quos dolor earum iste rerum inventore odit numquam doloremque voluptatibus? Quod atque doloremque sint modi rem, animi facilis amet iusto voluptate saepe similique repudiandae voluptatem magnam ducimus omnis? Veniam asperiores tempore a deleniti iure, voluptates distinctio, laudantium odit, placeat beatae repellat architecto doloremque quis voluptatem aperiam iste cupiditate necessitatibus vero saepe nulla? Vero qui cupiditate laudantium facere sequi ratione consequuntur consectetur commodi quis magni vel labore aut saepe omnis, sunt enim corrupti suscipit quod eius placeat fugiat. Itaque eos molestias optio eius facilis esse corporis aperiam minima qui magni. Amet excepturi, officia voluptate nostrum cum, eaque sunt voluptates blanditiis eos perferendis ipsum illum. Cupiditate, repudiandae voluptates? Corporis sunt numquam dignissimos soluta illum.',
      cover_image: '',
    },
    {
      template_title: 'This is Template Number 3!',
      template_sub_title: 'This template is ok… (sigh), i guess.',
      body_copy: 'Quibusdam expedita labore id dicta voluptatibus, sunt deleniti laudantium atque inventore vero eum velit quasi cupiditate blanditiis ab? Optio veritatis quos et consequuntur atque fugit, eaque illum. Exercitationem quas quia tenetur velit neque dolorum, reiciendis blanditiis et deserunt aspernatur dolor placeat cupiditate nemo, iste deleniti. Incidunt repellendus quas eius! Quae eius, nostrum similique sunt saepe nemo obcaecati perferendis ea libero porro doloribus illo itaque vero nesciunt a quos dolor earum iste rerum inventore odit numquam doloremque voluptatibus? Quod atque doloremque sint modi rem, animi facilis amet iusto voluptate saepe similique repudiandae voluptatem magnam ducimus omnis? Cupiditate, repudiandae voluptates? Corporis sunt numquam dignissimos soluta illum.',
      cover_image: 'https://picsum.photos/666/350',
    },
    {
      template_title: 'This is Template Number 4!',
      template_sub_title: 'This template is last but not least!',
      body_copy: 'Incidunt repellendus quas eius! Quae eius, nostrum similique sunt saepe nemo obcaecati perferendis ea libero porro doloribus illo itaque vero nesciunt a quos dolor earum iste rerum inventore odit numquam doloremque voluptatibus?',
      cover_image: '',
    },
  ];

  async function loadTemplate(filename) {
    const template = await fetch(`./templates/${filename}.html`);
    const reader = template.body.getReader();

    let {value: chunk, done: readerDone} = await reader.read();
    let file = chunk ? utf8Decoder.decode(chunk) : '';

    let varsToReplace = file.match(variableRegx);
    window.templateNumber = parseInt(filename.replace('template', '')) - 1;
    let html = replaceVars(varsToReplace, file, filename);
    
    view.classList = '';
    setTimeout( () => {
      view.innerHTML = html;
      view.classList = 'active';
    }, 500)
  }

  function replaceVars(vars,file) {
    let html;
    
    vars.forEach( item => {
      file = file.replace(item, messageData[window.templateNumber][sanitizevar(item)]);
    })
    html = file;
    return html;
  }

  function sanitizevar(item) {
    return item.trim().replace(/({{)|(}})/g, '');
  }
  
  function sanitizevars(varsArray) {
    let res = [];
    varsArray.forEach( item => {
      res.push(item.replace(/({{)|(}})/g, ''));
    })
    return res;
  }

  function buttonClickHandler(event) {
    loadTemplate(event.currentTarget.dataset.filename);
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('template1');

    document.querySelectorAll('#view-nav button').forEach(button => {
      button.addEventListener('click', buttonClickHandler)
    });
  })
})();